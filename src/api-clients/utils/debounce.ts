export const debounce = (cb: (...args: any) => void, time: number) => {
  let id: number = 0;

  const cancelCall = ()=>{
    if (id) {
      clearTimeout(id);
      id = 0;
    }
  }

  return (...args: any) => {
    cancelCall();

    // only call callback after 300ms of user stops types
    // @ts-ignore
    id = setTimeout(() => {
      cb(...args);
    }, time);

    return cancelCall;
  };
};
