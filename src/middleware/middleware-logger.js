const middlewareLogger = store => next => action => {
    console.log('Original State:', store.getState());
    console.log('Current Action:', action); // why is action assosiated with dispatch(requestHeadlines) not printed? 
    next(action);  //what does next(action) do?
    console.log('New Updated State:', store.getState());
  };
  
  export default middlewareLogger;
