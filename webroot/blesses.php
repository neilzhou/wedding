<?php
function getData($key){
    return empty($_GET[$key]) ? '': trim($_GET[$key]);
}
$result = array(
    'success' => true,
    'message' => 'OK',
    'data' => array()
);

header("content-type:application/json");

include_once '../lib/DataSource.php';
$conn = new Connection();
if (!$conn->connected()) {
    $result['success'] = false;
    $result['message'] = $conn->getMessage();
    echo json_encode($result);exit;
}

$max_bless_id = intval(getData('max_bless_id'));
$max_bless_id = empty($max_bless_id) ? 0 : $max_bless_id;

$limit = intval(getData('limit'));
$limit = empty($limit) ? 10 : $limit;

$criteria = array(
    'limit' => $limit + 1,
    'order' => 'id desc'
);
if (!empty($max_bless_id)) {
    $criteria['conditions'] = array(
        'keys' => array('id < ?'),
        'values' => array($max_bless_id)
    );
}
$result['data'] = $conn->find_by('bless', $criteria);
$result['has_more'] = count($result['data']) > $limit ? true : false;
if ($result['has_more']) {
    $last = array_pop($result['data']);
    //echo "===$limit==". json_encode($last). "---";
}

echo json_encode($result);
