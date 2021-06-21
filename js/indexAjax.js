function getNhanVienApi() {
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        responseType: 'json',

    });
  
    promise.then(function (result) {
        console.log(result.data);
 
        renderTableNhanVien(result.data);
    })

    
    promise.catch(function (errors) {
        console.log('errors', errors);
    })
}
getNhanVienApi();

function renderTableNhanVien(arrNV) {
 
    let content = '';
    for (nv of arrNV) {
  
        let NhanVien = new nhanVien(nv.maNhanVien, nv.tenNhanVien, nv.chucVu, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);

     
        let trNhanVien = `
            <tr>
                <td>${NhanVien.maNhanVien}</td>          
                <td>${NhanVien.tenNhanVien}</td>          
                <td>${NhanVien.chucVu}</td>          
                 <td>${NhanVien.luongCB}</td>
                 <td>${NhanVien.tongLuong}</td>
                <td>${NhanVien.soGio}</td>  
                <td>${NhanVien.xepLoai()}</td>
                <td><button class= "btn btn-danger" onclick="xoaNhanVien('${NhanVien.maNhanVien}')">Xóa</button>      
                <button class="btn btn-primary" onclick="suaThongTin('${NhanVien.maNhanVien}')">Chỉnh sửa</button>
                </td>  
                </tr>
        `;
        content += trNhanVien;

    }
  
    document.querySelector('#tblNhanVien').innerHTML = content;
}

//------------------POST----------------

document.querySelector('#btnThemNV').onclick = (e) => {
    e.preventDefault();
    validation();

    if (validation() === true) {
        let arrInput = document.querySelectorAll('input,select');
        console.log('arrInput', arrInput);
        let nhanVienMock = {};
        for (let input of arrInput) {

            let { name, value } = input;

            nhanVienMock = { ...nhanVienMock, [name]: value }

            nhanVienMock.maNhanVien=Number(nhanVienMock.maNhanVien);
            nhanVienMock.heSoChucVu=Number( nhanVienMock.heSoChucVu);
            nhanVienMock.luongCoBan=Number(nhanVienMock.luongCoBan);
            nhanVienMock.soGioLamTrongThang=Number(nhanVienMock.soGioLamTrongThang);

            if (nhanVienMock.heSoChucVu == 1) {
                nhanVienMock.chucVu = "Nhân viên";

            } else if (nhanVienMock.heSoChucVu == 2) {
                nhanVienMock.chucVu = "Quản lý";

            } else if (nhanVienMock.heSoChucVu == 3) {
                nhanVienMock.chucVu = "Giám đốc"
            }

        }


        console.log(nhanVienMock)


        let promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nhanVienMock
        })
        promise.then(function (result) {
            console.log('result', result.data);
            getNhanVienApi();
        })
    
    
        promise.catch(function (error) {
            console.log('error', error.response.data);
        })
    }


}


//--------------------Delete------------------

function xoaNhanVien(maNhanVienClick) {

    let promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE'
    });

    promise.then(function (result) {
        console.log('result', result.data);
        getNhanVienApi();
    })

    // Khi that bai

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}

//------------Fix--------------------
function suaThongTin(maNhanVienClick) {

    let promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVienClick}`,
        method: 'GET'
    });

   
    
        promise.then(function (result) {
            console.log(result.data);
           let nhanVienFix= result.data;
            document.querySelector('#maNhanVien').value=nhanVienFix.maNhanVien;
            document.querySelector('#tenNhanVien').value=nhanVienFix.tenNhanVien;
            document.querySelector('#heSoChucVu').value=nhanVienFix.heSoChucVu;
            document.querySelector('#luongCB').value=nhanVienFix.luongCoBan;
            document.querySelector('#gioLam').value=nhanVienFix.soGioLamTrongThang;
        })

        let contentUpdate=` <button type="button" class="btn btn-outline-success" id="updateThemNV" onclick="updateNV(${maNhanVienClick})">Cập nhật nhân viên</button>`;
        document.querySelector('#capNhat').innerHTML=contentUpdate;

    }
    

//---------------Update-----------------
function updateNV(maNhanVienUpdate){

 
    validation();
    if(validation() ===true){
        let arrUpdate = document.querySelectorAll('input,select');
        let nhanVienUpdate = {};
        for (let update of arrUpdate) {
    
            let { name, value } = update;
    
            nhanVienUpdate = { ...nhanVienUpdate, [name]: value }
    
            nhanVienUpdate.maNhanVien=Number(nhanVienUpdate.maNhanVien);
            nhanVienUpdate.heSoChucVu=Number( nhanVienUpdate.heSoChucVu);
            nhanVienUpdate.luongCoBan=Number(nhanVienUpdate.luongCoBan);
            nhanVienUpdate.soGioLamTrongThang=Number(nhanVienUpdate.soGioLamTrongThang);
    
            if (nhanVienUpdate.heSoChucVu == 1) {
                nhanVienUpdate.chucVu = "Nhân viên";
    
            } else if (nhanVienUpdate.heSoChucVu == 2) {
                nhanVienUpdate.chucVu = "Quản lý";
    
            } else if (nhanVienUpdate.heSoChucVu == 3) {
                nhanVienUpdate.chucVu = "Giám đốc"
            }
    
        }
        console.log(maNhanVienUpdate)
        let promise =axios({
            url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${maNhanVienUpdate}`,
            method:'PUT',
            data: nhanVienUpdate
        });
        promise.then(function(result){
            console.log('result',result.data);
            getNhanVienApi();
        })
        promise.catch(function(error){
            console.log(error.response.data);
        })
    }
   

}

        
    
