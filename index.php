<?php
  if ($_SERVER["REQUEST_METHOD"] == 'POST'){

    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $gender = trim($_POST['gender']);
    $hearabout = trim($_POST['hearabout']);

    if ($firstname == "" OR $lastname == "" OR $email == ""){
      $error_message = "You must enter a firstname, lastname and email";
    }
    if ($_POST['test'] != "" AND !isset($error_message)){
      $error_message = "You entered an invalid field";
    }
    if (!isset($error_message)){
      header('Location: index.php?status=thanks');
      connect_db($firstname, $lastname, $email, $gender, $hearabout);
    }
  }
  function connect_db($firstname, $lastname, $email, $gender, $hearabout){
    $server = 'localhost';
    $db = 'test_form';
    $username = 'root';
    $password = 'root';

    $conn = new mysqli($server, $username, $password, $db);

    if ($conn->connect_error){
      die('Connection Error');
    }
    $sql = "INSERT INTO form (firstname, lastname, email, gender, hearabout) VALUES ('$firstname', '$lastname', '$email', '$gender', '$hearabout')";

    if ($conn->query($sql) === TRUE) {
        
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
  }
?>

<?php include('inc/header.php');?>
<div class="form">
<?php
if (isset($_GET['status']) AND $_GET['status'] == 'thanks'){
  echo "<h2>Thanks for contacting us! We'll get back to you soon.</h2>";

  exit;
} else {
  if (isset($error_message)){
    echo '<h2>' . $error_message . '</h2>';
  }else {
    echo "<h2>Send us a message.</h2>";
  }

}
?>

<form method="post">
  <table>
    <tr>
      <td>
        <span>Firstname:</span>
      </td>
      <td>
        <input type="text" name="firstname" value="<?php if (isset($firstname)){ echo htmlspecialchars($firstname);} ?>">
      </td>
    </tr>
    <tr>
      <td>
        <span>Lastname:</span>
      </td>
      <td>
        <input type="text" name="lastname" value="<?php  ?>">
      </td>
    </tr>
    <tr>
      <td>
        <span>Email:</span>
      </td>
      <td>
        <input type="email" name="email" value="<?php ?>">
      </td>
    </tr>
    <tr>
      <td>
        <span>Gender </span>
      </td>
      <td>
        <input type="radio" name="gender" value="male"> <span class="small">Male</span><br/>
        <input type="radio" name="gender" value="female"> <span class="small">Female</span><br/>
      </td>
    </tr>
    <tr>
      <td>
        <span>How you heard about us</span>
      </td>
      <td>
        <select name="hearabout" id="hear">
          <option value="newspaper">Newspaper</option>
          <option value="online">Online</option>
          <option value="friend">Friend</option>
        <select>
      </td>
    </tr>
    <tr style="display: none;">
      <td>
        Test
      </td>
      <td>
        <input id="submit" type="text" name="test" value="<?php ?>">
      </td>
    </tr>

  </table>






  <input id="submit" type="submit" value="Submit">

</form>
</div>

<?php include('inc/footer.php');?>
