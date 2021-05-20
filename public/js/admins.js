//bu sınıfta chat kısmı yapılırken kullanıcı kontrollerinin yapılması sağlanır

const admins = [];
//{id , adminname ,channel}

//addadmin ,removeadmin ,getadmin ,getadminListInChannel fonksiyonları bulunacak
const addAdmin =(id,adminname, channel)=>{

    //id adminname ve channel gerekli
    if(!adminname || !id || !channel){


        return {
            error:'kullanıcı adı ve kanal bilgisi gerekli'
        }

    }
    //o kanalda aynı isimle başka bir admin var mı bunun kontorlu yapılır
    const existingadmin = admins.find(admin =>
        
        admin.channel === channel && admin.adminname ===adminname)

        if(existingadmin){
            return{
                error:'kullanıcı adı kullanılıyor'
            }
        }
        //yukarıdaki işlemler çalışıyorsa eğer kayıt işlemini yapar

    const admin ={id ,adminname,channel};
    admins.push(admin);
    return admin;
}
//admin ı alma işlemi
const getAdmin =(id) =>{
    return admins.find(admin=>admin.id ===id);
}
//admin ı silmek için
const removeAdmin = (id) =>{
    const adminIndex = admins.findIndex(admin => admin.id == id);
    
    if(adminIndex === -1){
        return -1;
    }
    else{
        return admins.splice(adminIndex,1)[0];
    }
    
}
//admin i kaydetme işlemi
const getAdminListInChannel =(channel)=>{
    return admins.filter(admin => admin.channel == channel);
}
/*
const admin =addadmin(
     11,
    'sab',
    'aaa'
);

*/


module.exports={
    addAdmin,
    getAdmin,
    removeAdmin,
    getAdminListInChannel

}