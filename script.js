function calcPrice() {

    let plate = document.getElementById("plate").value;
    let bike = document.getElementById("bike").value;

    plate = plate.replace(/[^0-9]/g, '');

    if (plate.length < 1 || plate.length > 4) {
        alert("กรุณาใส่เลขทะเบียน 1-4 หลัก");
        return;
    }

    let oldData = localStorage.getItem("plate_" + plate);

if(oldData){

    let item = JSON.parse(oldData);

    alert(
        "ทะเบียนนี้เคยใช้งานแล้ว\n\n" +
        "รุ่นรถ : " + item.bike + "\n" +
        "ราคาเดิม : " + item.total + " บาท"
    );

}


    let total = 0;
    let services = [];

    document.querySelectorAll('.service:checked').forEach(item => {

        total += Number(item.value);

        services.push(
            item.parentElement.textContent.trim()
        );

    });


let coupon =
document.getElementById("coupon").value.toUpperCase();

let discount = 0;

let savedCoupon =
localStorage.getItem(
    "coupon_" + coupon
);

if(savedCoupon){

    let couponData =
    JSON.parse(savedCoupon);

    if(Date.now() < couponData.expire){

        discount =
        couponData.amount;

    }else{

        localStorage.removeItem(
            "coupon_" + coupon
        );

    }
}



let finalPrice = total - discount;

if(finalPrice < 0){
    finalPrice = 0;
}

    document.getElementById('result').innerHTML =

`
<h3>ข้อมูลรถ</h3>

เลขทะเบียน : ${plate}<br>
รุ่นรถ : ${bike}<br><br>

<h3>รายการที่เลือก</h3>

${services.join("<br>")}<br><br>

ราคารวม : ${total} บาท<br>
ส่วนลด : ${discount} บาท<br><br>

<h2 style="color:#00ff66">
จำนวนเงินลูกค้า : ${finalPrice} บาท
</h2>
`;

    localStorage.setItem(
        "plate_" + plate,
        JSON.stringify({
            bike: bike,
            total: total,
          date: new Date().toLocaleDateString('th-TH'),
time: new Date().toLocaleTimeString('th-TH'),
day: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"][new Date().getDay()]
        })
    );

}

function resetForm() {

    document.getElementById("plate").value = "";

    document.getElementById("bike").selectedIndex = 0;

    document.querySelectorAll(".service").forEach(item => {
        item.checked = false;
    });

   document.getElementById("result").innerHTML =
"ยังไม่ได้คำนวณราคา";

}

function openDatabase() {

    let pass = prompt("กรุณาใส่รหัสผ่าน");

    if(pass !== "Pun Flash ecu."){
        alert("รหัสผ่านไม่ถูกต้อง");
        return;
    }

    let html = "";

    for(let i=0;i<localStorage.length;i++){

        let key = localStorage.key(i);

        if(key.startsWith("plate_")){

            let item = JSON.parse(localStorage.getItem(key));

          html += `
<label>
<input type="checkbox" class="deleteItem" value="${key}">
${key.replace("plate_","")} |
${item.bike} |
${item.total} บาท
<br>
📅 ${item.date}
(วัน${item.day})
⏰ ${item.time}
</label><br><br>
`;
        }
    }
    html += "<hr><h3>โค้ดส่วนลด</h3>";

for(let i=0;i<localStorage.length;i++){

    let key = localStorage.key(i);

    if(key.startsWith("coupon_")){

        let coupon =
JSON.parse(localStorage.getItem(key));

html +=
key.replace("coupon_","") +
" ลด " +
coupon.amount +
" บาท<br>";

    }

}

    document.getElementById("databaseList").innerHTML =
        html || "ยังไม่มีข้อมูล";

    document.getElementById("databaseBox").style.display =
        "block";
}

function closeDatabase(){

    document.getElementById("databaseBox").style.display =
        "none";
}

function deleteSelected(){

    let selected =
        document.querySelectorAll(".deleteItem:checked");

    if(selected.length === 0){

        alert("กรุณาเลือกรายการ");

        return;
    }

    selected.forEach(item => {

        localStorage.removeItem(item.value);

    });

    alert("ลบข้อมูลเรียบร้อย");

    openDatabase();
}

function saveAndReset() {

    let plate = document.getElementById("plate").value;
    let bike = document.getElementById("bike").value;

    if (plate == "") {

        alert("กรุณากรอกเลขทะเบียน");

        return;
    }

    let total = 0;

    document.querySelectorAll('.service:checked').forEach(item => {

        total += Number(item.value);

    });

    localStorage.setItem(
        "plate_" + plate,
        JSON.stringify({
            bike: bike,
            total: total,
           date: new Date().toLocaleDateString('th-TH'),
time: new Date().toLocaleTimeString('th-TH'),
day: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"][new Date().getDay()]
        })
    );

    alert("บันทึกข้อมูลเรียบร้อย");

    resetForm();
}

function sendToAdmin() {

    let plate = document.getElementById("plate").value;
    let bike = document.getElementById("bike").value;

    let total = 0;
    let services = [];

    document.querySelectorAll('.service:checked').forEach(item => {

        total += Number(item.value);

        services.push(
            item.parentElement.textContent.trim()
        );

    });

    let message =
`PUN FLASH ECU

เลขทะเบียน : ${plate}

รุ่นรถ : ${bike}

รายการ :
${services.join('\n')}

ราคารวม : ${total} บาท`;

    navigator.clipboard.writeText(message);

    alert(
        "คัดลอกข้อมูลแล้ว\n\nกด OK เพื่อเปิดแชทเฟส"
    );

    window.open(
        "https://www.facebook.com/thir.sakdi.330230?locale=th_TH",
        "_blank"
    );
}

window.onload = function(){

   setTimeout(() => {

      document.getElementById("loader").style.display = "none";

   },5000);

}

function addCoupon(){

    let pass = prompt("กรุณาใส่รหัสผ่าน");

    if(pass !== "Pun Flash ecu."){
        alert("รหัสผ่านไม่ถูกต้อง");
        return;
    }

    let code = prompt("ชื่อโค้ดส่วนลด");

    if(!code) return;

    let amount = prompt("จำนวนส่วนลด");

    if(!amount) return;

    let hours = prompt("ใช้งานได้กี่ชั่วโมง");

    if(!hours) return;

    let expire =
    Date.now() + (Number(hours) * 60 * 60 * 1000);

    localStorage.setItem(
        "coupon_" + code.toUpperCase(),
        JSON.stringify({
            amount:Number(amount),
            expire:expire
        })
    );

    alert("สร้างโค้ดสำเร็จ");
}

function deleteCoupons(){

    let pass = prompt("กรุณาใส่รหัสผ่าน");

    if(pass !== "Pun Flash ecu."){
        alert("รหัสผ่านไม่ถูกต้อง");
        return;
    }

    for(let i=localStorage.length-1;i>=0;i--){

        let key = localStorage.key(i);

        if(key.startsWith("coupon_")){
            localStorage.removeItem(key);
        }

    }

    alert("ลบโค้ดส่วนลดทั้งหมดแล้ว");

    openDatabase();
}

function showWarning(){

alert(`

⚠️ คำเตือน

หากจูนรถกับทางร้านแล้ว
กรุณาอย่านำรถไปรีแมพหรือปรับแต่งกับร้านอื่น

หากมีการจูนหรือแก้ไขจากร้านอื่น
จะถือว่าเป็นการย้ายค่าย
และทางร้านจะไม่สามารถรับประกันผลงานเดิมได้

ห้ามเปลี่ยนอะไหล่หรือเปลี่ยนสเต็ปเองโดยไม่ได้แจ้งทางร้านก่อน
เนื่องจากอาจส่งผลต่อการทำงานของไฟล์ที่จูนไว้

หากต้องการอัปเกรดหรือเปลี่ยนสเต็ป
กรุณานัดหมายล่วงหน้าก่อนเข้ารับบริการ
เพื่อป้องกันการติดคิว

กรุณาตรวจสอบ
• น้ำมันเครื่อง
• เชื้อเพลิง
• สภาพรถโดยรวม

ก่อนเข้ารับบริการทุกครั้ง

หากมีข้อสงสัยสามารถสอบถามได้ตลอด

ขอบคุณที่ไว้วางใจ
PUN FLASH ECU

`);

}

function showWarning(){
    document.getElementById("warningPopup").style.display="flex";
}

function closeWarning(){
    document.getElementById("warningPopup").style.display="none";
}
