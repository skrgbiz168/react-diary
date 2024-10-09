import React, { useContext, useState } from "react";
import { dig } from "dig-ts";
import { signInWithGoogle, logOut } from "../service/firebase";
import { user } from "../providers/AuthProvider";

const Header = () => {
  const [value, setValue] = useState();

  const button = () => {
    let butttonDom;

    if (user) {
      butttonDom = <button onClick={ logOut }>ログアウト</button>
    } else {
      butttonDom = <button onClick={ signInWithGoogle }>ログイン</button>
    }
    return butttonDom
  }

  return(
    <header>
      ヘッダー
      { button() }
    </header>
  )
}

export default Header;
