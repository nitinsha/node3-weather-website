console.log('Client side js loaded');
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
                if(data.error){
                    messageOne.style.color="red";
                    messageOne.textContent=data.error;
                }else{
                    messageOne.style.color="green";
                    messageOne.textContent=data.location;
                    messageTwo.innerHTML=data.forecast
                }
            })
        });
        
    });
