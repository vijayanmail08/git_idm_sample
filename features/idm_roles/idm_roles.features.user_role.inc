<?php
/**
 * @file
 * idm_roles.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function idm_roles_user_default_roles() {
  $roles = array();

  // Exported role: CNS Administrator.
  $roles['CNS Administrator'] = array(
    'name' => 'CNS Administrator',
    'weight' => 11,
  );

  // Exported role: Contractor.
  $roles['Contractor'] = array(
    'name' => 'Contractor',
    'weight' => 2,
  );

  // Exported role: Domain Administrator.
  $roles['Domain Administrator'] = array(
    'name' => 'Domain Administrator',
    'weight' => 6,
  );

  // Exported role: Employee.
  $roles['Employee'] = array(
    'name' => 'Employee',
    'weight' => 3,
  );

  // Exported role: Finance Team.
  $roles['Finance Team'] = array(
    'name' => 'Finance Team',
    'weight' => 9,
  );

  // Exported role: Functional.
  $roles['Functional'] = array(
    'name' => 'Functional',
    'weight' => 4,
  );

  // Exported role: Helpdesk Team.
  $roles['Helpdesk Team'] = array(
    'name' => 'Helpdesk Team',
    'weight' => 8,
  );

  // Exported role: International Team.
  $roles['International Team'] = array(
    'name' => 'International Team',
    'weight' => 12,
  );

  // Exported role: Messaging Administrator.
  $roles['Messaging Administrator'] = array(
    'name' => 'Messaging Administrator',
    'weight' => 5,
  );

  // Exported role: Security Team.
  $roles['Security Team'] = array(
    'name' => 'Security Team',
    'weight' => 7,
  );

  // Exported role: Telecom Team.
  $roles['Telecom Team'] = array(
    'name' => 'Telecom Team',
    'weight' => 10,
  );

  return $roles;
}
