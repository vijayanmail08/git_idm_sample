<?php
/**
 * @file
 * idm_content_types.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function idm_content_types_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function idm_content_types_node_info() {
  $items = array(
    'rest_api' => array(
      'name' => t('Rest API'),
      'base' => 'node_content',
      'description' => t('Create a new form to handle REST APIs. Submission results and statistics are recorded and accessible to privileged users.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
