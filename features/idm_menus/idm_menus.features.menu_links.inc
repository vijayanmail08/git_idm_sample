<?php
/**
 * @file
 * idm_menus.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function idm_menus_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu:<front>
  $menu_links['main-menu:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Search',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
  );
  // Exported menu link: main-menu:assets
  $menu_links['main-menu:assets'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'assets',
    'router_path' => 'assets',
    'link_title' => 'Assets',
    'options' => array(),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
  );
  // Exported menu link: main-menu:groups
  $menu_links['main-menu:groups'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'groups',
    'router_path' => 'groups',
    'link_title' => 'Groups',
    'options' => array(),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
  );
  // Exported menu link: main-menu:myworkers
  $menu_links['main-menu:myworkers'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'myworkers',
    'router_path' => 'myworkers',
    'link_title' => 'My Workers',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
  );
  // Exported menu link: main-menu:notifications
  $menu_links['main-menu:notifications'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'notifications',
    'router_path' => 'notifications',
    'link_title' => 'Notifications',
    'options' => array(),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Assets');
  t('Groups');
  t('MyWorkers');
  t('Notifications');
  t('Search');


  return $menu_links;
}
