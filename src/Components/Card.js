import React from "react"

class Card extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <div className="col-5">
                            <img src={this.props.coverBuku_} className="img"
                            height="200" />
                        </div>
                        <div className="col-7">
                            <h5 className="text-info">{ this.props.judulBuku_ }</h5>
                            <h6 className="text-dark">Penulis: { this.props.penulisBuku_}</h6>
                            <h6 className="text-dark">Penerbit: { this.props.penerbitBuku_}</h6>
                            <h6 className="text-danger">Harga: Rp { this.props.hargaBuku_}</h6>

                            <button className="btn btn-sm btn-primary m-1"onClick={this.props.onEditBuku_}>Edit</button>
                            <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDropBuku_}>Hapus</button>
                            <button className="btn btn-sm btn-success m-1"onClick={this.props.onCartBuku_}>Tambahkan</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card;