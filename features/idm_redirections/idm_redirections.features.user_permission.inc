<?php
/**
 * @file
 * idm_redirections.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function idm_redirections_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer redirects'.
  $permissions['administer redirects'] = array(
    'name' => 'administer redirects',
    'roles' => array(),
    'module' => 'redirect',
  );

  return $permissions;
}
