import { useDispatch } from "react-redux";
import "./mylogin.scss";
import { useState } from "react";
import { alogin } from "../../API/user";
import { Button, Input } from "antd";

const MyLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="login-wrapper">
      <div className="login">
        <div style={{ padding: "10px", marginBottom: "10px" }}>Вход</div>
        <Input
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Name"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input.Password
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Password"
          value={password}
          onChange={(event) => {
            console.log(password);
            setPassword(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            console.log("click");
            dispatch(alogin(email, password));
          }}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default MyLog;
