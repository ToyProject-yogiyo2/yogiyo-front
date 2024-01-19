export const locationRegionCode = (kakao: any, geocoder: any, coord: any) => {
  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(coord.lng, coord.lat, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0].code);
      } else {
        reject(new Error('Failed to decode address'));
      }
    });
  });
};
