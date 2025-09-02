const signUP = (req, res) => {
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
