export const ShowDisclaimer = id => {
  const arr = ["5ca8a10d35b915002208c730"];
  return arr.some(v => v === id);
};

export const isLiveNet = ( id, state = process.env.REACT_APP_STELLAR_MODE === 'livenet' ) => {
  
  const toOverride = [{ id: "GAD4KBKNWN5IB6SL7IEVU2ZGBHHSY75575XFL6K52RT4MYIQUEZUGDP7", live: true}];

  // if the id is not in observing and the id is not set to live in observing then have the state determined by the default;
  let found;

  let check_ToOverride = toOverride.some(o => {
    if(o.id === id){ found = o; return o.id === id;}
    return false;
  });

  switch (check_ToOverride) {
      case true:
      return found.live;

    default:
      return state;
  }

};