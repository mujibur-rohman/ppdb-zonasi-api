const getCookie = async (req, res, next) => {
  const {
    headers: { cookie },
  } = req;
  console.log(cookie);
  if (cookie) {
    const values = cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
    res.locals.cookie = values;
  } else res.locals.cookie = {};
  next();
};

export default getCookie;
