import { fromJS } from 'immutable';

export const groupEducationsBySchool = (educations) => {
  return educations.sortBy(education => education.get('title'))
    .groupBy(education => education.get('school'));
};

export const orderEducationGroupsBySchool = (groupedBySchool) => {
  const order = [
    'Affärshögskolan',
    'Teknikhögskolan',
    'Vårdyrkeshögskolan',
    'Plushögskolan',
  ];

  return order.reduce((memo, item) => {
    const group = groupedBySchool.get(item);
    return (group) ? memo.set(item, group) : memo;
  }, fromJS({}));
};

export const keepOnlyNotSearchableEducations = (educations) => {
  return educations.filter(education => {
    return (education.get('status') === 'notSearchable');
  });
};

export const filterOutNotSearchableEducations = (educations) => {
  return educations.filter(education => {
    return (education.get('status') !== 'notSearchable');
  });
};

export const filterEducationsThroughQuery = (query, educations) => {
  return educations.filter(education => {
    let willPassFilter = true;
    //För varje utbildning, loopa igenom query-parametrar

    query.map((val, key) => {
      //Om parametern inte har något värde läggs true till i arrayen
      const slugFromVal = val.get('slug');

      if (!!slugFromVal) {
        //annars kolla vilken nyckel parametern har
        switch (key) {
          case 'location':
            //Om det är location, försök hitta en ort med slug som
            // matchar filtrets value...
            //..och returnera true/false om den hittar/inte
            willPassFilter = (!!education.get(key).find(item => {
              return (item.get('slug') === slugFromVal);
            })) ? willPassFilter : false;
            break;
          case 'subject':
            //Om det är subject, kolla om ämnets slug
            //matchar filtrets value...
            willPassFilter = (education.getIn([key, 'slug'])
            === slugFromVal)
              ? willPassFilter : false;
            break;
          case 'establishment':
            //Om det är establishment, kolla om typens slug
            // matchar filtrets value...
            willPassFilter = (education.getIn([key, 'slug'])
            === slugFromVal)
              ? willPassFilter : false;
            break;
          default:
            break;
        }
      }
    });

    //Returnera utbildningen om den matchar alla filter
    return willPassFilter;
  });
};
