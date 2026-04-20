<?php

header("Content-Type:application/json");

$con = mysqli_connect('srv1113.hstgr.io', 'u858168866_usrsecure', '0*cUn*bC9Xa', 'u858168866_secureiot', 3306) or die("Could not connect to database");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['tag']) && $_POST['tag'] != '') {
        $tag = $_POST['tag'];
        $response = array();

        if ($tag == "registration") {
            $mobile = $_POST['mobile'];
            $password = $_POST['password'];
            $deviceId = $_POST['deviceId'];
        
            // Check if mobile or deviceId already exists
            $checkQuery = "SELECT id FROM users WHERE mobile = '$mobile' OR deviceId = '$deviceId'";
            $checkResult = mysqli_query($con, $checkQuery);
        
            if (mysqli_num_rows($checkResult) > 0) {
                $response = [
                    "error" => 1,
                    "message" => "Mobile number or Device ID already registered!",
                ];
                echo json_encode($response);
            } else {
                // Proceed with registration
                $query1 = "INSERT INTO users(password, mobile, deviceId) VALUES('$password', '$mobile', '$deviceId')";
                $result1 = mysqli_query($con, $query1);
        
                if ($result1) {
                    $id = mysqli_insert_id($con);
                    $query2 = "SELECT id, mobile FROM users WHERE id = '$id'";
                    $result2 = mysqli_query($con, $query2);
        
                    if ($result2) {
                        $response = mysqli_fetch_assoc($result2);
                        $response["error"] = 0;
                        $response["message"] = "Registered successfully!";
                        echo json_encode($response);
                    } else {
                        $response = [
                            "error" => 1,
                            "message" => "Error occurred! Try again!",
                        ];
                        echo json_encode($response);
                    }
                } else {
                    $response = [
                        "error" => 1,
                        "message" => "Registration failed! Try again!",
                    ];
                    echo json_encode($response);
                }
            }
        
            // Close connection
            mysqli_close($con);
        }
        

        if ($tag == "login") {
            $mobile = $_POST['mobile'];
            $password = md5($_POST['password']);

            $query = "SELECT mobile FROM users WHERE mobile = '$mobile' AND  password = '$password'";
            $result = mysqli_query($con, $query);

            mysqli_close($con);

            $count = mysqli_num_rows($result);

            if ($count == 1) {
                $response = mysqli_fetch_assoc($result);
                $response["error"] = 0;
                $response["message"] = "Welcome " . $response["name"];
                echo json_encode($response);
            } else {
                $response["error"] = 1;
                $response["message"] = "Unable to login with provided credentials!";
                echo json_encode($response);
            }
        }

        if ($tag == "toggle") {
        
            $datetime = $_POST['datetime'];
            $deviceId = $_POST['deviceId'];
            $status = $_POST['status'];
        
            $query = "INSERT INTO toggle (datetime, deviceId, status) VALUES ('$datetime', '$deviceId', '$status')";
            $result = mysqli_query($con, $query);
        
            if ($result) {
                echo json_encode(["error" => 0, "message" => "Controlled successfully"]);
            } else {
                echo json_encode(["error" => 1, "message" => "Error occurred! Try again!"]);
            }
        }        


    } else {
        $response["error"] = 1;
        $response["error_msg"] = "Required parameter 'tag' is missing!";
        echo json_encode($response);
    }
} else {
    echo 'Secure Gateway IOT';
}
