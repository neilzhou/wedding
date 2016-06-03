<?php
date_default_timezone_set('PRC');
//date_default_timezone_set('Asia/Shanghai'); 
/**
 * Class DataSource
 * @author Neil.zhou
 */
class Connection
{
    private $error;
    private $db;

    /**
     * getDB
     *
     * @return PDO
     */
    public function getDB()
    {
        return $this->db;
    }
    
    public function getMessage() {
        return $this->error;
    }

    public function __construct(){
        $prod = true;
        if ($prod) {
            $config = array(
                'driver' => 'mysql:host=127.0.0.1;dbname=s642796db0;charset=UTF8',
                'username' => 's642796db0',
                'password' => '0d609d1b'
            );
        } else {
            $config = array(
                'driver' => 'mysql:host=127.0.0.1;dbname=wedding;charset=UTF8',
                'username' => 'wedding',
                'password' => 'Wedding@#$'
            );
        }

        try{
        
            $conn = new PDO($config['driver'], $config['username'], $config['password'], array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ));
        } catch (Exception $e){
            $this->error = $e->getMessage();
            $conn = null;
        }
        $this->db = $conn;
    }

    public function connected(){
        return ! empty($this->db);
    }

    public function insert($table, $data) {
        $sql = 'insert into `'.$table . '` (`';
        $sql .= implode('`, `', array_keys($data));
        $sql .= '`) values(';
        $sql .= str_repeat('?,', count($data));
        $sql = substr($sql, 0, -1);
        $sql .= ')';

        //echo json_encode($data);exit;
        $state = $this->db->prepare($sql);
        $state->execute(array_values($data));
        return $this->db->lastInsertId();
    }

    public function find_by($table, $criteria) {
        $fields = empty($criteria['fields']) ? '*' : '`' . implode('`,`', $criteria['fields']) . '`';
        $sql = 'select ' . $fields . ' from `' . $table . '`';
        //$sql .= empty($criteria['conditions']) ? '' : ' where ' . $this->_buildConditions($criteria['conditions']);
        $sql .= empty($criteria['conditions']) || empty($criteria['conditions']['keys']) ? '' : ' where ' . implode(' and ', $criteria['conditions']['keys']);

        $conditions_values = empty($criteria['conditions']) || empty($criteria['conditions']['values']) ? array() : $criteria['conditions']['values'];

        if(!empty($criteria['order'])) {
            $sql .= ' order by ' . (is_string($criteria['order']) ? $criteria['order'] : implode(', ', $criteria['order']));
        }

        if(!empty($criteria['limit']) && isset($criteria['offset'])) {
        
            $sql .= ' limit ' . $criteria['offset'] . ', ' . $criteria['limit'];
        }
        elseif(!empty($criteria['limit'])) {
            $sql .= ' limit ' . $criteria['limit'];
        }
        $state = $this->db->prepare($sql);
        //echo json_encode($sql);
        $state->execute($conditions_values);
        return $state->fetchAll(PDO::FETCH_ASSOC);
    } 

    private function _buildConditions($conditions){
        if(empty($conditions)) {
            return '';
        }

        $str = array();
        foreach($conditions as $key => $value) {
            if(strpos($key, '?') !== false) {
                $str[] = preg_replace_callback('/\?/', function($matches) use($value){
                    return is_array($value) ? $this->db->quote(array_shift($value)) : $this->db->quote($value);
                }, $key);
                //$str[] = str_replace('?', $this->db->quote($value), $key);
            } elseif(preg_match('/[><=]/', $key)){
            
                $str[] = $key . $this->db->quote($value);
            } else {
                $str[] = "`$key` = " . $this->db->quote($value);
            }
        }

        return implode(' and ', $str);
    }
}
