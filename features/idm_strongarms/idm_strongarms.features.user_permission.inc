<?php
/**
 * @file
 * idm_strongarms.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function idm_strongarms_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'access idm profile'.
  $permissions['access idm profile'] = array(
    'name' => 'access idm profile',
    'roles' => array(
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'idm_profile',
  );

  return $permissions;
}
