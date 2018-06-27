
/**
 * addLicence
 * @param  {org.pivot.licences.addLicence} addLicence -
 * @transaction
 */
async function    addLicence(licenceDetails) {




    // Get the Asset Registry

    return getAssetRegistry('org.pivot.licences.licence')
    
        .then(function(licenceRegistry){

            console.log('REG ', licenceDetails)
                 // console.log('REG ', licenceDetails.licenceDetails.companyName)

            var  factory = getFactory();

            var  NS =  'org.pivot.licences';

            var  licenceId = licenceDetails.licenceId;
            var licenceData = factory.newResource(NS,'licence',licenceId);
      		
            
            licenceData.licenceName = licenceDetails.licenceName;
            licenceData.licenceIssuedBy = licenceDetails.licenceIssuedBy;
			licenceData.licenceIssuedTo = licenceDetails.licenceIssuedTo;
            licenceData.licenceNumber = licenceDetails.licenceNumber;
            licenceData.createdOn = licenceDetails.createdOn;
            licenceData.licenceValidityDate = licenceDetails.licenceValidityDate;
			//licenceData.licenceDetails.companyName = licenceDetails.licenceDetails.companyName;


           return licenceRegistry.add(licenceData);
 
        });
}


/**
 * 
 * @param {org.pivot.licences.viewLicence} licenceDetails - the LicenceDetails transaction
 * @transaction
 */


async function viewLicence(licenceDetails) { // eslint-disable-line no-unused-vars
    //console.log('Details ', licenceDetails.participant);

  //console.log('Details ', licenceDetails.participant.getIdentifier());
  console.log('Details 2PP', getCurrentParticipant().getFullyQualifiedIdentifier());
    console.log('Details 3PP', getCurrentParticipant().getFullyQualifiedType());


  const NS_D = 'org.pivot.licences';
  const assetRegistry = await getAssetRegistry(NS_D + '.licence');
  const details = await query('selectAllLicences');
  console.log('Hey ', details)
//	if( getCurrentParticipant().getFullyQualifiedType() ==="org.pivot.participant.pivotPrivate" || licenceDetails.participant.getIdentifier() =="PRIVATE"){
    
//    return details;

 // }
    
    
  if(getCurrentParticipant().getFullyQualifiedType() == "org.pivot.participant.pivotPublic"){
    
    
    var res = [];
    
      for (let x = 0; x < details.length; x++) {
          console.log(details[x].licenceName)     
          console.log(details[x].licenceId)     
          res.push(details[x].licenceName)
          res.push(details[x].licenceId)
      }
        console.log(res)
    //  alert(res)
  
  }else{
    return details;
  }
  
}




/**
 * 
 * @param {org.pivot.licences.viewLicenceBasedOnCompanyName} licenceDetails - the LicenceDetails transaction
 * @transaction
 */


async function viewLicenceByCompanyName(licenceDetails) { 
    console.log('Details ', licenceDetails);

    const NS_D = 'org.pivot.licences';
    const assetRegistry = await getAssetRegistry(NS_D + '.licence');
    const details = await query('selectAllLicencesBasedOnCompany',{'licenceIssuedTo': licenceDetails.companyName});
    console.log('Hey ', details)

    

  
  return details;
}

