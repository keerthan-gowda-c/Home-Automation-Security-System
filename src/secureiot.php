<?php

header("Content-Type:application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$con = mysqli_connect('srv1113.hstgr.io', 'u858168866_usrsecure', '0*cUn*bC9Xa', 'u858168866_secureiot',3306) or die("Could not connect to database");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['tag']) && $_POST['tag'] != '') {

        $tag = $_POST['tag'];
        $response = array();

        if ($tag == "login") 
        {
        
            $userid = $_POST['userid'];  
            $Password = $_POST['password'];

            $query = "SELECT * FROM admin WHERE userid='$userid' AND password='$Password'";
            $result = mysqli_query($con, $query);

            if (mysqli_num_rows($result) == 1)
            {
                $response = mysqli_fetch_assoc($result);
                $response["error"] = 0;
                $response["message"] = "Welcome ";
               
                echo json_encode($response);

            }
             else 
            {
                $response["error"] = 1;
                $response["message"] = "Unable to login with provided credentials!";
                echo json_encode($response);
            }

           
        }



        if ($tag == "getusers") {
            $query = "SELECT * FROM users";
            $result = mysqli_query($con, $query);
        
            if ($result) {
                $datalist = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $datalist[] = $row;
                }
                echo json_encode($datalist);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to fetch  list']);
            }
        }

        if ($tag == "deleteuser") {

           
            $id = $_POST['id'];

            $query1 = "DELETE FROM users WHERE id=$id";
            $result1 = mysqli_query($con, $query1);

            if ($result1) {
                $response["error"] = 0;
                $response["message"] = "deleted successfully!";
            } else {
                $response["error"] = 1;
                $response["message"] = "Error occurred! Try again!";
            }
            
            echo json_encode($response);
        }

        if ($tag == "Approveeuser") {

            $id = $_POST['id'];
        
            
            $stmt = $con->prepare("UPDATE users SET status = 'Y' WHERE id = ?");
            $stmt->bind_param("i", $id);
        
            if ($stmt->execute()) {
                $response["error"] = 0;
                $response["message"] = "User approved successfully!";
            } else {
                $response["error"] = 1;
                $response["message"] = "Error occurred! Try again!";
            }
        
            $stmt->close();
            echo json_encode($response);
        }

        if ($tag == "denieduser") {

            $id = $_POST['id'];
        
            
            $stmt = $con->prepare("UPDATE users SET status = 'N' WHERE id = ?");
            $stmt->bind_param("i", $id);
        
            if ($stmt->execute()) {
                $response["error"] = 0;
                $response["message"] = "User Blocked successfully!";
            } else {
                $response["error"] = 1;
                $response["message"] = "Error occurred! Try again!";
            }
        
            $stmt->close();
            echo json_encode($response);
        }
        
        if ($tag == "gettoggles") {
            $query = "SELECT * FROM toggle";
            $result = mysqli_query($con, $query);
        
            if ($result) {
                $datalist = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $datalist[] = $row;
                }
                echo json_encode($datalist);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to fetch  list']);
            }
        }

 
        }

    } 
    
    else
    {
        echo 'SucureIOT ';
    }


