const schema = {
  name: 'company_stations',
  num_documents: 0,
  fields: [
    {
      name: 'company_id',
      type: 'string',
      facet: false,
      reference: 'companies.id',
    },
    {
      name: 'station_id',
      type: 'string',
      facet: false,
      reference: 'stations.id',
    },
    {
      name: 'raw_station_id',
      type: 'int32',
      facet: false,
    },
    {
      name: 'station_location',
      type: 'geopoint',
      facet: false,
    },
  ],
  default_sorting_field: 'raw_station_id',
};

export default schema;
