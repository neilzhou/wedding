<?php
function getData($key){
    return empty($_POST[$key]) ? '': trim($_POST[$key]);
}

function validate($data){
    $errors = array();
    if (empty($data['name'])) {
        $errors['userName'] = '请填写您的姓名。';
    }
    if (empty($data['join_status'])) {
        $errors['status'] = '请选择是否赴宴。';
    }
    if (empty($data['count'])) {
        $errors['count'] = '请选择您赴宴的人数。';
    }

    return $errors;
}

$result = array(
    'success' => true,
    'message' => '您的信息已成功提交，谢谢!',
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

$data['name'] = getData('userName');
$data['join_status'] = getData('status');
$data['count'] = getData('count');

$errors = validate($data);
//echo json_encode($errors);exit;
if (!empty($errors)) {
    $result['success'] = false;
    $result['data'] = $errors;
    echo json_encode($result);exit;
}

$data['created_at'] = date('Y-m-d H:i:s');
$data['modified_at'] = date('Y-m-d H:i:s');

try {
    $data['participant_id'] = $conn->insert('wedding_participants', $data);
} catch (Exception $e) {
    $result['success'] = false;
    $result['message'] = $e->getMessage();
    echo json_encode($result); exit;
}

if (empty($data['participant_id'])) {
    $result['success'] = false;
    $result['message'] = '系统维护中，敬请等待！';
    echo json_encode($result); exit;
}

unset($data['join_status']);
unset($data['count']);
$data['message'] = getData('blessMsg');

if (empty($data['message'])) {
    $result['data'] = $data;
    echo json_encode($result); exit;
}

try {
    $data['id'] = $conn->insert('bless', $data);
    $result['message'] = '我们已经成功收到您的祝福，谢谢!';
} catch (Exception $e) {
    $result['success'] = false;
    $result['message'] = $e->getMessage();
    echo json_encode($result); exit;
}

$result['data'] = $data;

echo json_encode($result);
