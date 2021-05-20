//bu sınıfta chat kısmı yapılırken kullanıcı kontrollerinin yapılması sağlanır

const users = [];
//{id , username ,channel}

//addUser ,removeUser ,getUser ,getUserListInChannel fonksiyonları bulunacak
const addUser =(id,username, channel)=>{

    //id username ve channel gerekli
    if(!username || !id || !channel){


        return {
            error:'kullanıcı adı ve kanal bilgisi gerekli'
        }

    }
    //o kanalda aynı isimle başka bir user var mı bunun kontorlu yapılır
    const existingUser = users.find(user =>
        
        user.channel === channel && user.username ===username)

        if(existingUser){
            return{
                error:'kullanıcı adı kullanılıyor'
            }
        }
        //yukarıdaki işlemler çalışıyorsa eğer kayıt işlemini yapar

    const user ={id ,username,channel};
    users.push(user);
    return user;
}
//user ı alma işlemi
const getUser =(id) =>{
    return users.find(user=>user.id ===id);
}
//user ı silmek için
const removeUser = (id) =>{
    const userIndex = users.findIndex(user => user.id == id);
    
    if(userIndex === -1){
        return -1;
    }
    else{
        return users.splice(userIndex,1)[0];
    }
    
}
//user i kaydetme işlemi
const getUserListInChannel =(channel)=>{
    return users.filter(user => user.channel == channel);
}
/*
const user =addUser(
     11,
    'sab',
    'aaa'
);

*/


module.exports={
    addUser,
    getUser,
    removeUser,
    getUserListInChannel

}