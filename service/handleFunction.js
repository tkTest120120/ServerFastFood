hdf = {}

hdf.getTenLoaiMon = (listLoaiMon , idLoaiMon) => {
    const a = listLoaiMon.filter((item) => {
        if(item.idLoaiMon === idLoaiMon){
            return item.tenLoai;
        }
     });
     return a[0].tenLoai;
}

module.exports = hdf;