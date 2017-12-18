<?php
/**
 * @file
 * idm_context.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function idm_context_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'homepage';
  $context->description = '';
  $context->tag = 'IDM';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'homepage' => 'homepage',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'system-main' => array(
          'module' => 'system',
          'delta' => 'main',
          'region' => 'content',
          'weight' => '-18',
        ),
        'idm_notifications-renew' => array(
          'module' => 'idm_notifications',
          'delta' => 'renew',
          'region' => 'content',
          'weight' => '-17',
        ),
        'idm_notifications-approve' => array(
          'module' => 'idm_notifications',
          'delta' => 'approve',
          'region' => 'content',
          'weight' => '-16',
        ),
        'idm_notifications-expiringgroups' => array(
          'module' => 'idm_notifications',
          'delta' => 'expiringgroups',
          'region' => 'content',
          'weight' => '-15',
        ),
        'idm_portal-my_staff' => array(
          'module' => 'idm_portal',
          'delta' => 'my_staff',
          'region' => 'content',
          'weight' => '-14',
        ),
        'idm_profile-profile_progress' => array(
          'module' => 'idm_profile',
          'delta' => 'profile_progress',
          'region' => 'sidebar_second',
          'weight' => '-16',
        ),
        'idm_profile-my_profile' => array(
          'module' => 'idm_profile',
          'delta' => 'my_profile',
          'region' => 'sidebar_second',
          'weight' => '-15',
        ),
        'idm_portal-recommends' => array(
          'module' => 'idm_portal',
          'delta' => 'recommends',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('IDM');
  $export['homepage'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'notifications';
  $context->description = 'Notifications menu page';
  $context->tag = 'IDM';
  $context->conditions = array(
    'menu' => array(
      'values' => array(
        'notifications' => 'notifications',
      ),
    ),
  );
  $context->reactions = array();
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('IDM');
  t('Notifications menu page');
  $export['notifications'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'sitewide';
  $context->description = '';
  $context->tag = 'IDM';
  $context->conditions = array(
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'search-form' => array(
          'module' => 'search',
          'delta' => 'form',
          'region' => 'header',
          'weight' => '-10',
        ),
        'system-navigation' => array(
          'module' => 'system',
          'delta' => 'navigation',
          'region' => 'header',
          'weight' => '-9',
        ),
        'system-help' => array(
          'module' => 'system',
          'delta' => 'help',
          'region' => 'header',
          'weight' => '-8',
        ),
        'user-login' => array(
          'module' => 'user',
          'delta' => 'login',
          'region' => 'header',
          'weight' => '-7',
        ),
        'system-main-menu' => array(
          'module' => 'system',
          'delta' => 'main-menu',
          'region' => 'navigation',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('IDM');
  $export['sitewide'] = $context;

  return $export;
}
