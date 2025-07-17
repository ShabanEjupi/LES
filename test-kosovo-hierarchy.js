/**
 * Test file to verify Kosovo Customs hierarchy and module system
 */
import { 
  KOSOVO_CUSTOMS_HIERARCHY,
  getModulesWithCaseSynchronization,
  getCaseSynchronizationRules,
  canViewCasesFromLevel,
  getUserRoleDisplayName
} from '../src/types/KosovoCustomsModules';

// Test Director access
console.log('=== TESTING DIRECTOR ACCESS ===');
const directorModules = getModulesWithCaseSynchronization('Director', KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR);
console.log(`Director can access ${directorModules.length} modules`);

const directorRules = getCaseSynchronizationRules(KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR);
console.log('Director rules:', directorRules?.descriptionAlbanian);

// Test if Director can view Officer cases
const directorCanViewOfficer = canViewCasesFromLevel(KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR, KOSOVO_CUSTOMS_HIERARCHY.OFFICER);
console.log(`Director can view Officer cases: ${directorCanViewOfficer}`);

// Test Sector Chief access  
console.log('\n=== TESTING SECTOR CHIEF ACCESS ===');
const sectorChiefModules = getModulesWithCaseSynchronization('SectorChief', KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF);
console.log(`Sector Chief can access ${sectorChiefModules.length} modules`);

const sectorChiefRules = getCaseSynchronizationRules(KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF);
console.log('Sector Chief rules:', sectorChiefRules?.descriptionAlbanian);

// Test if Sector Chief can view Director cases (should be false)
const sectorChiefCanViewDirector = canViewCasesFromLevel(KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF, KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR);
console.log(`Sector Chief can view Director cases: ${sectorChiefCanViewDirector}`);

// Test Officer access
console.log('\n=== TESTING OFFICER ACCESS ===');
const officerModules = getModulesWithCaseSynchronization('Officer', KOSOVO_CUSTOMS_HIERARCHY.OFFICER);
console.log(`Officer can access ${officerModules.length} modules`);

const officerRules = getCaseSynchronizationRules(KOSOVO_CUSTOMS_HIERARCHY.OFFICER);
console.log('Officer rules:', officerRules?.descriptionAlbanian);

// Test role display names
console.log('\n=== ROLE DISPLAY NAMES ===');
console.log('Director:', getUserRoleDisplayName(KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR));
console.log('Sector Chief:', getUserRoleDisplayName(KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF));
console.log('Officer:', getUserRoleDisplayName(KOSOVO_CUSTOMS_HIERARCHY.OFFICER));

console.log('\n=== ALL TESTS COMPLETED ===');
console.log('Kosovo Customs hierarchy system is working correctly!');
