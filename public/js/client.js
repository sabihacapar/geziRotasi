

const socket = io();


//elemanlar
const sendLocationButton = document.querySelector('#sendLocation');
const sendButton = document.querySelector('#send');
const messageInput = document.querySelector('#message');

const receivedMessage = document.querySelector('#receivedMessage');
const sidebarInfo = document.querySelector('#sidebarInfo');


//template
const receivedMessageTemplate = document.querySelector('#receivedMessageTemplate').innerHTML;

const sidebarInfoTemplate = document.querySelector('#sidebarInfoTemplate').innerHTML;
//console.log(Qs.parse(location.search,{ignoreQueryPrefix:true}));//lokasyon bilgisini almak için kullanılır.
const { username, channel } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join', { username, channel }, (error, user) => {
    if (error) {
        alert(error);
    }
})
sendButton.addEventListener('click', () => {
    sendButton.setAttribute('disabled', 'disabled');
    const messageText = messageInput.value;

    socket.emit('sendMessage', messageText, (isDelivered) => {
        if (isDelivered) {
            console.log('gönderildi');

        } else {
            console.log('gonderilemedi')
        }
        messageInput.value = '';
        messageInput.focus();

        sendButton.removeAttribute('disabled');


    });//mesajı göndermek için
});
socket.on('receivedMessage', (messageObj) => {
    const { username, message, createdAt } = messageObj;
    const template = Handlebars.compile(receivedMessageTemplate);
    receivedMessage.insertAdjacentHTML('beforeend', template({
        username,
        message,
        createdAt: moment().format('H:mm')
    }));

});

sendLocationButton.addEventListener('click', () => {
    //deactive -disabled
    sendLocationButton.setAttribute('disabled', 'disabled');
    if (!navigator.geolocation) {
        console.log('hata');
        sendLocationButton.removeAttribute('disabled');
        return;
    }
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', {
            latitude: latitude,
            longitude: longitude
        });
        sendLocationButton.removeAttribute('disabled');
        const template = Handlebars.compile(receivedMessageTemplate);
        receivedMessage.insertAdjacentHTML('beforeend', template({

        }))

    });
});
socket.on('sidebarInfo',({channel,users})=>{
    
    const template = Handlebars.compile(sidebarInfoTemplate);
    sidebarInfo.innerHTML = template({
        channel,
        users
    })

})

/*
socket.on('count',(count)=>{
    console.log('count: ',count);
});

*/



