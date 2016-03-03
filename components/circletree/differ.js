module.exports = function differ(o1,o2,props) {
  if (typeof props === "object") {
    props = Object.keys(props);
  }

  for(var i=props.length, p; i>-1; i--) {
    p = props[i];
    if (o1[p] !== o2[p]) return true;
  }

  return false;
};
