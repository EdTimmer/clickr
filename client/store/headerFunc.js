const headers = () => {
  const token = window.localStorage.getItem('token');
  return { authorization: token };
};

export default headers;
