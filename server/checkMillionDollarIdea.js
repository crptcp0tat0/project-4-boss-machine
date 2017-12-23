const checkMillionDollarIdea = (req, res, next) => {
  const expectedReturn = (Number(req.body.weeklyRevenue) * Number(req.body.numWeeks))
  if (expectedReturn < 1000000) {
    res.status(400).send();
  } else if (!expectedReturn) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;





/*{ id: '1',
  name: 'Test',
  description: 'The name says it all!!!',
  weeklyRevenue: 96673,
  numWeeks: 93 }
*/
