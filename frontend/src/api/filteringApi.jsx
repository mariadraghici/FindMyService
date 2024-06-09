import myAxios from '../components/axios/axios';
import { getAllServices } from './serviceApi';

export const filter = async (selectedCars, selectedFacilities, selectedcities, formData) => {
    try {
        let res = null;
        if (Object.values(selectedCars).every(value => value === false) && selectedcities.length === 0 && selectedFacilities.length === 0 &&
            formData.brand === '' && formData.model === '' && formData.engine === '') {
            // console.log('here');
            return await getAllServices();
        }

        // If no cars are selected
        if (Object.values(selectedCars).every(value => value === false) && formData.brand === '') {
            // If no cities are selected and facilities are selected
            if (selectedcities.length === 0 && selectedFacilities.length !== 0) {
                res = await myAxios.post('/api/service/filter/facility', {
                    serviceFacilities: selectedFacilities?.map(facility => facility._id),
                });
            // If cities are selected and no facilities are selected
            } else if (selectedcities.length !== 0 && selectedFacilities.length === 0) {
                res = await myAxios.post('/api/service/filter/location', {
                    cities: selectedcities?.map(location => location._id)
                });
            // If cities and facilities are selected
            } else {
                res = await myAxios.post('/api/service/filter/locationfacility', {
                    cities: selectedcities?.map(location => location._id),
                    serviceFacilities: selectedFacilities?.map(facility => facility._id)
                });
            }
        }

        // If cars are selected
        if (Object.values(selectedCars).every(value => value === false) === false) {
            if (selectedcities.length === 0 && selectedFacilities.length !== 0) {
                res = await myAxios.post('/api/service/filter/facilitycars', {
                    serviceFacilities: selectedFacilities?.map(facility => facility._id),
                    cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                });
            } else if (selectedcities.length !== 0 && selectedFacilities.length === 0) {
                res = await myAxios.post('/api/service/filter/locationcars', {
                    cities: selectedcities?.map(location => location._id),
                    cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                });
            } else if (selectedcities.length === 0 && selectedFacilities.length === 0) {
                res = await myAxios.post('/api/service/filter/cars', {
                    cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                });
            } else {
                res = await myAxios.post('/api/service/filter', {
                    cities: selectedcities?.map(location => location._id),
                    serviceFacilities: selectedFacilities?.map(facility => facility._id),
                    cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                });
            }
        }

        if (formData.brand !== '') {
            
            if (formData.model === null) {
                formData.model = '';
            }

            if (formData.engine === null) {
                formData.engine = '';
            }

            if (selectedcities.length !== 0 && selectedFacilities.length === 0) {
                res = await myAxios.post('/api/service/filter/locationothers', {
                    cities: selectedcities?.map(location => location._id),
                    others: formData
                });
            } else if (selectedcities.length === 0 && selectedFacilities.length !== 0) {
                res = await myAxios.post('/api/service/filter/facilityothers', {
                    serviceFacilities: selectedFacilities?.map(facility => facility._id),
                    others: formData
                });
            } else if (selectedcities.length !== 0 && selectedFacilities.length !== 0) {
                res = await myAxios.post('/api/service/filter/locationfacilityothers', {
                    cities: selectedcities?.map(location => location._id),
                    serviceFacilities: selectedFacilities?.map(facility => facility._id),
                    others: formData
                });
            } else {
                res = await myAxios.post('/api/service/filter/others', {
                    others: formData
                });
            }
        }
            
        // setServices(res.data.services);
        console.log(res);
        return res.data.services;
    } catch (error) {
        console.log(error);
    }
};
