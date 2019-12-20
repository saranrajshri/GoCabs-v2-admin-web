import { auth } from "../firebase/firebase";

export const loginSupplier = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
