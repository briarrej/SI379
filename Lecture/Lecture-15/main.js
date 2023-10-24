const promiseObject = new Promise((resolve,reject)=>{



    setTimeout(()=>{
        resolve('hello');
    }, 5000);
});

const compoundPromise = promiseObject.then((value)=>{
    console.log('five seconds have passed');

    const fetchPromise = fetch('https://events.umich.edu/day/json?v=2');
    return fetchPromise;
})

compoundPromise.then((value)=> {
    console.log(value);

})

const fetchPromise = fetch('https://events.umich.edu/day/json?v=2');

const jsonPromise = fetchPromise.then((response)=> {
    const jsonDataPromise = response.json();
    console.log('response', response);
    return jsonPromise; 
});

   // console.log('jsonData', jsonDataPromise);
    //jsonDataPromise.then((data) => {
      //  console.log('data', data)
    //});

    //return jsonDataPromise; 

//})