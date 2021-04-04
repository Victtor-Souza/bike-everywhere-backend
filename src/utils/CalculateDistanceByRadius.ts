function CalculateDistanceByRadius(originLatitude: number, originLongitude:number, destinationLatitude:number, destinationLongitude:number): number
{
  const OriginLatitudeRadianus = originLatitude * Math.PI / 180;
  const OriginLongitudeRadianus = originLongitude * Math.PI / 180;
  const DestinationLatitudeRadianus = destinationLatitude * Math.PI / 180;
  const DestinationLongitudeRadianus = destinationLongitude * Math.PI / 180;

  const distance = (Math.acos(Math.cos(OriginLatitudeRadianus) * Math.cos(OriginLongitudeRadianus) * Math.cos(DestinationLatitudeRadianus) * Math.cos(DestinationLongitudeRadianus) + Math.cos(OriginLatitudeRadianus) * Math.sin(OriginLongitudeRadianus) * Math.cos(DestinationLatitudeRadianus) * Math.sin(DestinationLongitudeRadianus) + Math.sin(OriginLatitudeRadianus) * Math.sin(DestinationLatitudeRadianus)) * 6371);
    return distance;
}

export default CalculateDistanceByRadius;