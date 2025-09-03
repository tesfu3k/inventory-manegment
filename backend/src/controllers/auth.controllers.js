const signUP = (req, res) => {
  /**
   * 1 validate the data email name password x
   * 2 check if the email is existed since we have email unique x
   * 3 hash the password
   * 4 save the use
   * 5 send the response
   */
  const {name, email, password } = req.body;
  console.log(email);
  res
    .status(200)
    .json({ message: "sign up sucessfuly", success: true, data: null });
};
const signIn = (req, res) => {
  res
    .status(200)
    .json({ message: "sign In sucessfuly", success: true, data: null });
};
const signOut = (req, res) => {
  res
    .status(200)
    .json({ message: "sign Out sucessfuly", success: true, data: null });
};
const currentUser = (req, res) => {
  res.status(200).json({
    message: "current user loaded sucessfuly",
    success: true,
    data: null,
  });
};

export { signIn, signOut, signUP, currentUser };
