<?php
/**
 * @file
 * idm_strongarms.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function idm_strongarms_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
