import React from 'react';
import './Table.css'

export default function Table(props) {
    return (
        <table className="table">
            {props.children}
        </table>);
}



//return (
//    <div>
//        {/*Header or title component*/}
//        <div className="flex-column">
//            <div className="dashboard-header">
//                <h2 style={{ margin: '1.5em' }}>Apartments</h2>
//            </div>

//            <div style={{ backgroundColor: '#F4F4F4' }}>
//                <Container style={{ marginTop: '-50px' }}>
//                    {/*Total apartments display*/}
//                    <div className="flex-row" style={{ marginBottom: '1.5em' }}>
//                        <div className="admin-card flex-row fit-content" style={{ paddingInline: '3em', alignItems: 'center' }}>
//                            <div className="flex-column" style={{ marginInlineEnd: '2em' }}>
//                                <h6 style={{ fontWeight: 300 }}>Apartments</h6>
//                                <h2>{totalApartments}</h2>
//                            </div>
//                            <svg width="64" height="41" viewBox="0 0 64 41" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                <path fillRule="evenodd" clipRule="evenodd" d="M17.3556 0.375526C17.6912 0.152169 18.1281 0.152169 18.4637 0.375526L35.3723 11.6289C35.6509 11.8143 35.8183 12.1268 35.8183 12.4614V13.2744L45.5372 6.80604C45.8728 6.58268 46.3097 6.58268 46.6453 6.80604L63.554 18.0594C63.8326 18.2449 63.9999 18.5573 63.9999 18.8919V36.5759C63.9999 37.7486 63.4542 38.835 62.5496 39.6092C61.6497 40.3792 60.4582 40.7911 59.2425 40.7911H51.7275H40.4551H32.9401C31.7244 40.7911 30.5329 40.3792 29.633 39.6092C28.7283 38.835 28.1827 37.7486 28.1827 36.5759V18.8919C28.1827 18.5573 28.35 18.2449 28.6286 18.0594L33.8183 14.6055V12.9971L17.9096 2.40924L2.00098 12.9971V30.1453C2.00098 30.6781 2.24704 31.2273 2.75167 31.6591C3.26111 32.095 3.98113 32.3606 4.75845 32.3606H11.2734V17.2843C11.2734 16.732 11.7211 16.2843 12.2734 16.2843H23.5458C24.0981 16.2843 24.5458 16.732 24.5458 17.2843V32.3606H27.3033V34.3606H23.5458H12.2734H4.75845C3.54268 34.3606 2.35125 33.9487 1.45136 33.1787C0.546663 32.4045 0.000976562 31.3181 0.000976562 30.1453V12.4614C0.000976562 12.1268 0.168352 11.8143 0.446925 11.6289L17.3556 0.375526ZM41.4551 38.7911H50.7275V24.7148H41.4551V38.7911ZM52.7275 38.7911V23.7148C52.7275 23.1625 52.2798 22.7148 51.7275 22.7148H40.4551C39.9028 22.7148 39.4551 23.1625 39.4551 23.7148V38.7911H32.9401C32.1628 38.7911 31.4428 38.5255 30.9334 38.0896C30.4287 37.6578 30.1827 37.1086 30.1827 36.5759V19.4276L46.0913 8.83975L61.9999 19.4276V36.5759C61.9999 37.1086 61.7539 37.6578 61.2492 38.0896C60.7398 38.5255 60.0198 38.7911 59.2425 38.7911H52.7275ZM22.5458 32.3606V18.2843H13.2734V32.3606H22.5458Z" fill="currentColor" />
//                            </svg>
//                        </div>
//                        <a className="btn-lg btn-primary" href='/apartments/create' style={{ marginTop: '3em', position: 'absolute', right: `calc(10%)` }}>Create Listing</a>
//                    </div>

//                    {/*For searching components*/}
//                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                        {/*Verification status drop down box*/}
//                        <Mui.TextField
//                            id="filled-select-status"
//                            select
//                            label="Verification Status"
//                            helperText=""
//                            variant="outlined"
//                            style={{ width: '220px' }}
//                            value={status}
//                            onChange={handleStatusOptionChange}
//                        >
//                            {statusOptions.map((option) => (
//                                <Mui.MenuItem key={option.value} value={option.value}>
//                                    {option.label}
//                                </Mui.MenuItem>
//                            ))}
//                        </Mui.TextField>

//                        {/*Category drop down box*/}
//                        <Mui.TextField
//                            id="filled-select-category"
//                            select
//                            label="Category"
//                            helperText=""
//                            variant="outlined"
//                            style={{ width: '220px' }}
//                            value={category}
//                            onChange={handleCategoryChange}
//                        >
//                            {categories.map((option) => (
//                                <Mui.MenuItem key={option.value} value={option.value}>
//                                    {option.label}
//                                </Mui.MenuItem>
//                            ))}
//                        </Mui.TextField>

//                        <form className="bar" style={{ flexGrow: 1 }} >
//                            <button
//                                type="submit">
//                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
//                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//                                </svg>
//                            </button>
//                            <input className="searchbar"
//                                type="search"
//                                name="search"
//                                placeholder="Search..."
//                                value={inputSearch}
//                                onChange={handleSearchInputChange}
//                            >

//                            </input>
//                        </form>
//                    </div>
//                    <Table>
//                        <thead className="table-header">
//                            <tr className="table-row">
//                                <td className="table-cell">Apartment</td>
//                                <td className="table-cell">Date Created</td>
//                                <td className="table-cell">Occupancy Status</td>
//                                <td className="table-cell">Verification Status</td>
//                                <td className="table-cell">Manage</td>
//                                <td className="table-cell">Action</td>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {landlordApartments.map(apartment => {
//                                return (
//                                    <tr key={apartment.apartmentId} className="table-row">
//                                        <td className="table-cell flex-row" onClick={() => handleShowVerifyModal(apartment.apartmentId)}>
//                                            <div className="flex-column" style={{ marginLeft: '1em' }}>
//                                                <h6 style={{ margin: 0 }}>{`${apartment.name}`}</h6>
//                                                <p style={{ margin: 0, opacity: 0.7 }}>{`${apartment.location}`}</p>
//                                            </div>
//                                        </td>
//                                        {showStatusModal && apartmentToUpdate === apartment.apartmentId &&
//                                            <ModalComponent
//                                                title={apartment.name}
//                                                label={`Set ${apartment.name} to ${apartment.isFull ? 'Vacant' : 'Full'}`}
//                                                onYes={handleVerify}
//                                                onCancel={onCancel}
//                                                show={showStatusModal}
//                                            />}
//                                        <td className="table-cell" onClick={() => handleShowVerifyModal(apartment.apartmentId)}>
//                                            {convertToMMDDYYFormat(apartment.dateListed)}
//                                        </td>
//                                        <td className="table-cell" onClick={() => handleShowVerifyModal(apartment.apartmentId)}>
//                                            <h6 className={`${apartment.isFull ? 'red-tag' : 'green-tag'}`}>{apartment.isFull ? 'Full' : 'Vacant'}</h6>
//                                        </td>
//                                        <td className="table-cell" onClick={() => handleShowVerifyModal(apartment.apartmentId)}>
//                                            <h6 className={`${apartment.status == 'VERIFIED' ? 'green-tag' : apartment.status == 'DENIED' ? 'red-tag' : 'orange-tag'}`}>{`${apartment.status}`}</h6>
//                                        </td>
//                                        <td className="table-cell" >
//                                            <a href={`/manage/edit/2/${apartment.apartmentId}`}>
//                                                <svg onClick={() => handleClick(apartment.apartmentId)} width="24" strokeWidth="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                    <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="blue" strokeLinecap="round" strokeLinejoin="round" />
//                                                    <path d="M8 10H16M8 6H12M8 14H11" stroke="blue" strokeLinecap="round" strokeLinejoin="round" />
//                                                    <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="blue" stroke="blue" strokeLinecap="round" strokeLinejoin="round" />
//                                                    <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="blue" strokeLinecap="round" strokeLinejoin="round" />
//                                                    <title>Edit</title>
//                                                </svg>
//                                            </a>
//                                            <br />
//                                            <a href="" onClick={(e) => { e.preventDefault(); handleShowModal(apartment.apartmentId) }}>
//                                                <svg style={{ marginTop: '10px', cursor: 'pointer' }} right="0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                    <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z" fill="red" />
//                                                    <title>Delete</title>
//                                                </svg>
//                                            </a>
//                                            {showModal && apartmentToDelete === apartment.apartmentId && <ModalComponent title='Delete Apartment' label='Are you sure to delete this apartment?' onYes={handleDelete} onCancel={handleCancel} show={showModal} />}
//                                        </td>
//                                        <td className="table-cell" onClick={() => handleShowTenants(apartment.apartmentId)}>
//                                            Tenants
//                                        </td>
//                                        {showTenants && clickedApartment === apartment.apartmentId &&
//                                            <ViewTenantsModal onCancel={cancelShowTenants} show={showTenants} apartmentId={clickedApartment} />}
//                                    </tr>
//                                );
//                            }
//                            )}
//                        </tbody>
//                    </Table>
//                </Container>
//            </div>
//        </div>
//    </div>
//)