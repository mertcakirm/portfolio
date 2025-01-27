import React from 'react';

const MainComp = () => {
    return (
        <div className="container-fluid py-5">
            <div className="row row-gap-5">

                <div className="col-6">
                    <div className="row px-3 row-gap-3 justify-content-center">
                        <h3 className="col-12 text-center">Kişi Resmi</h3>
                        <input type="file" className="col-7"/>
                        <button className="col-6 login-btn">Resmi Güncelle</button>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row px-3 row-gap-3 justify-content-center">
                        <h3 className="col-12 text-center">Tanıtım Metni</h3>
                        <input type="text" className="col-7 login-inp"/>
                        <button className="col-6 login-btn">Metni Güncelle</button>
                    </div>
                </div>

                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-3 text-center">Eğitimleri Yönet</h3>
                        <input type="text" className="col-5 login-inp"/>
                        <button className="col-2 login-btn">Eğitim Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Eğitim ID</th>
                                    <th scope="col">Eğitim Metni</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">id</th>
                                    <td>12</td>
                                    <td>
                                        <button className="delete-btn">Sil</button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-3 text-center">Yetkinlikleri Yönet</h3>
                        <input type="text" className="col-5 login-inp"/>
                        <button className="col-2 login-btn">Yetkinlik Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Yetkinlik ID</th>
                                    <th scope="col">Yetkinlik Adı</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">id</th>
                                    <td>12</td>
                                    <td>
                                        <button className="delete-btn">Sil</button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-6">Projeleri Yönet</h3>
                        <button className="col-3 login-btn">Proje Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Yetkinlik ID</th>
                                    <th scope="col">Yetkinlik Adı</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">id</th>
                                    <td>12</td>
                                    <td>
                                        <button className="delete-btn">Sil</button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default MainComp;