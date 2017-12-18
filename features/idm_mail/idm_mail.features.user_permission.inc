<?php
/**
 * @file
 * idm_mail.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function idm_mail_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer mailsystem'.
  $permissions['administer mailsystem'] = array(
    'name' => 'administer mailsystem',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'mailsystem',
  );

  // Exported permission: 'choose htmlmail_plaintext'.
  $permissions['choose htmlmail_plaintext'] = array(
    'name' => 'choose htmlmail_plaintext',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'htmlmail',
  );

  return $permissions;
}
