import { event } from "jquery";
import React, {Component} from "react";  
class Cart extends Component {  
    constructor(){  
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
            nilai: 0
        }
    }  

    Drop = (i) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            var temp        = this.state.cart,
                totalHarga  = this.state.total,
                x           = temp.indexOf(i)

            let hasilAkhir = totalHarga - (temp[x].harga * temp[x].jumlahBeli)

            temp.splice(x, 1)                                       // <= menghapus dari array
            localStorage.setItem("cart", JSON.stringify(temp))      // Merubah lokal storage

            this.setState({                                         // Merubah state
                cart    : temp,     
                total   : hasilAkhir
            })
        }
    }

    tambahStok = (i) => {
        let temp        = this.state.cart;
        
        temp[i].jumlahBeli      += 1;                           // <= Menambah Stok
        var totalAkhir           = 0;
        for(let i = 0; i < temp.length; i++){
            totalAkhir += (temp[i].harga*temp[i].jumlahBeli);   // <= kalkulasi total harga 
        } 
        
        localStorage.setItem("cart", JSON.stringify(temp))      // <= Merubah lokal storage

        this.setState({                                         // <= Merubah State
            cart    : temp,
            total   : totalAkhir
        });   
    }

    kurangStok = (i) => {
        let temp        = this.state.cart;

        temp[i].jumlahBeli      -= 1;                           // <= Mengurangi Stok
        var totalAkhir           = 0;
        for(let i = 0; i < temp.length; i++){
            totalAkhir += temp[i].harga * temp[i].jumlahBeli;   // <= kalkulasi total harga 
        }
        
        localStorage.setItem("cart", JSON.stringify(temp))      // <= Merubah lokal storage

        this.setState({                                         // <= Merubah State
            cart    : temp,
            total   : totalAkhir
        });  
    }

    initCart = () => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)        // <= Total Harga   
        })

        this.setState({                                         // <= memasukan data ke State
            cart: tempCart,
            user: localStorage.getItem("user"),                 // <= nama User
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <div className="container">
            <br></br>
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: { this.state.user }
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Setting</th>
                                    <th>Total</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.cart.map( (item, index) => (
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>
                                            {item.jumlahBeli}
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary btn-block" onClick={() => this.tambahStok(index)}>+</button>
                                            <button className="btn btn-sm btn-info btn-block"    onClick={() => this.kurangStok(index)}>-</button>
                                        </td>
                                        <td>
                                            Rp { item.harga * item.jumlahBeli }
                                        </td>
                                        <td>    
                                            <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>

                        <h4 className="text-dark">Total : <strong>Rp {this.state.total}</strong></h4>
                    </div>
                </div>
            </div>
        )
    }
}  
export default Cart; 
