import React, { useContext } from "react";
import { userObjectContext } from "../App";

export interface HiUserProps {
  title: string;
  text: string;
}

const HiUser: React.FC<HiUserProps> = (props) => {
  const userObject = useContext(userObjectContext);

  return (
    <div className="hi-user">
      <section className="user-initials">
        <p>{userObject?.firstName.charAt(0).concat(userObject?.surname.charAt(0))}</p>
      </section>
      <section className="hi-user-title">
        <h3>
          {props.title} {userObject?.firstName}!
        </h3>
        <h4>{props.text}</h4>
      </section>
    </div>
  );
};

export default HiUser;
