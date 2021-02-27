import React, {Component} from "react";  
import $ from "jquery";
import Card from "./Card";
class Gallery extends Component {  
    constructor(){
        super()
        this.state = {
            buku: [
                {
                    isbn:"12345", judul:"Bulan", penulis:"Tere Liye",
                    penerbit:"CV Harapan Kita", harga: 90000,
                    cover:"https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
                },
                {
                    isbn:"12346", judul:"Anak Badai", penulis:"Tere Liye",
                    penerbit:"CV Nusa Bangsa", harga: 80000,
                    cover:"https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
                },
                {
                    isbn:"54321", judul:"Bumi", penulis:"Tere Liye",
                    penerbit:"CV Nusa Bangsa", harga: 70000,
                    cover:"https://drive.google.com/uc?id=1e-thvq7lkG1_gw0FqHzRoiAhfhdgpOUj"
                },
            ],

            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword: "",
            filterBuku: []
        }

        this.state.filterBuku = this.state.buku
    }

    tambahBuku = () => {
        $("#modalBuku").modal("show")
        this.setState({
            isbn            : Math.random(1,10000000),
            judul           : "",
            penulis         : "",
            penerbit        : "",
            cover           : "",
            harga           : 0,
            action          : "nambahBukuGaskan"
        })
    }

    editBuku = (item) => {
        $("#modalBuku").modal("show")
        this.setState({
            isbn         : item.isbn,
            judul        : item.judul,
            penulis      : item.penulis,
            penerbit     : item.penerbit,
            cover        : item.cover,
            harga        : item.harga,
            action       : "editBukuGaskan",
            selectedItem : item
        })
    }

    Save = (event) => {
        event.preventDefault();
        let tempBuku = this.state.buku

        if (this.state.action === "nambahBukuGaskan") {
            tempBuku.push({
                isbn        : this.state.isbn,
                judul       : this.state.judul,
                penulis     : this.state.penulis,
                penerbit    : this.state.penerbit,
                cover       : this.state.cover,
                harga       : this.state.harga,
            })
        }else if(this.state.action === "editBukuGaskan"){
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn     = this.state.isbn
            tempBuku[index].judul    = this.state.judul
            tempBuku[index].penulis  = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover    = this.state.cover
            tempBuku[index].harga    = this.state.harga
        }
        this.setState({buku : tempBuku})
        $("#modalBuku").modal("hide")
    }

    hapusBuku = (item) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            let tempBuku = this.state.buku
            let index = tempBuku.indexOf(item)
            tempBuku.splice(index, 1)               // <= Menghapus
            this.setState({buku: tempBuku})
        }
    }

    cariBuku = event => {
        if(event.keyCode === 13){
            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                item.penulis.toLowerCase().includes(keyword) || 
                item.penerbit.toLowerCase().includes(keyword)
            })

            this.setState({filterBuku: result})
        }
    }

    setUser = () => {
        if(localStorage.getItem("user") === null){         // <= Jika Storage user kosong
            let inputanKu = window.prompt("Masukkan Nama Anda","")
            if(inputanKu === null || inputanKu === ""){
                this.setUser()
            }else{
                localStorage.setItem("user", inputanKu)    // <= Simpan Nama di Storage
                this.setState({user: inputanKu})           // <= Simpan Nama di State.user
            }
        }else{                                             // <= Jika Storage user sudah ada
            let name = localStorage.getItem("user")
            this.setState({user: name})
        }
    }

    addToCart = (selectedItem) => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        if(tempCart.find(item => item.isbn === selectedItem.isbn)){     // <= Cari berdasarkan isbn
            window.alert("Anda telah memilih item ini")
        }else{
            let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
            if(promptJumlah !== null && promptJumlah !== ""){   
                selectedItem.jumlahBeli = promptJumlah                  // <= Menambah "jumlahBeli"
                tempCart.push(selectedItem)                             // <= Tambahkan ke array tempCart[]
                localStorage.setItem("cart", JSON.stringify(tempCart))  // <= Simpan itemke lokal storage
            }
        }
    }
    componentDidMount(){
        this.setUser()
    }

    render(){
        return(
            <div className="container">
            <br></br>
            <h4 className="text-info my-2">
                    Nama Pengguna: { this.state.user }
                </h4>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.cariBuku(ev)}/>

                <div className="row">
                    { this.state.filterBuku.map( (item, index) => (
                        <Card
                            judulBuku_       =  {item.judul}
                            penulisBuku_     =  {item.penulis}
                            penerbitBuku_    =  {item.penerbit}
                            hargaBuku_       =  {item.harga}
                            coverBuku_       =  {item.cover}
                            onEditBuku_      =  { () => this.editBuku(item)}
                            onDropBuku_      =  { () => this.hapusBuku(item)}
                            onCartBuku_      =  { () => this.addToCart(item)}
                        />
                    )) }
                </div>

                <button className="btn btn-success" onClick={() => this.tambahBuku()}>Tambah Data</button>

                <div className="modal" id="modalBuku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Form Buku</div>                            
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.judul}
                                    onChange={ ev => this.setState({judul: ev.target.value}) }
                                    required />
                                    
                                    Penulis Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penulis}
                                    onChange={ ev => this.setState({penulis: ev.target.value}) }
                                    required />
                                    
                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penerbit}
                                    onChange={ ev => this.setState({penerbit: ev.target.value}) }
                                    required />
                                    
                                    Harga Buku
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Cover Buku
                    <input type="url" className="form-control mb-2" 
                    value={this.state.cover} onChange={ ev => this.setState({cover: ev.target.value}) } required />

                                    <button className="btn btn-info btn-block" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}  
export default Gallery;