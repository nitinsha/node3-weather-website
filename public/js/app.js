console.log('Client side js loaded');
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then(data => {
//         console.log(data);
//     });
// });

// fetch('/weather?address=chennai')
//     .then(response => {
//         response.json()
//         .then(data=>{
//             console.log(data)
//         })
//     });
    const weatherForm = document.querySelector('form');
    const loc = document.querySelector('input');
    let messageOne = document.querySelector('#message-1');
    let messageTwo = document.querySelector('#message-2');
    
    weatherForm.addEventListener('submit', (e) => {
        messageOne.style.color="gray";
        messageOne.textContent="Loading...";
        messageTwo.textContent="";
        e.preventDefault();
        fetch('/weather?address='+loc.value)
        .then(response => {
            response.json()
            .then(data=>{
                console.log(data);
                if(data.error){
                    messageOne.style.color="red";
                    messageOne.textContent=data.error;
                }else{
                    messageOne.style.color="green";
                    messageOne.textContent=data.location;
                    messageTwo.innerHTML=data.forecast
                }
                console.log(data)
            })
        });
        
    });
