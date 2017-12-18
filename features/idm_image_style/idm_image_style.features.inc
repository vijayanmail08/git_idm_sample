<?php
/**
 * @file
 * idm_image_style.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function idm_image_style_image_default_styles() {
  $styles = array();

  // Exported image style: profile_header.
  $styles['profile_header'] = array(
    'name' => 'profile_header',
    'effects' => array(
      29 => array(
        'label' => 'Scale',
        'help' => 'Scaling will maintain the aspect-ratio of the original image. If only a single dimension is specified, the other dimension will be calculated.',
        'effect callback' => 'image_scale_effect',
        'dimensions callback' => 'image_scale_dimensions',
        'form callback' => 'image_scale_form',
        'summary theme' => 'image_scale_summary',
        'module' => 'image',
        'name' => 'image_scale',
        'data' => array(
          'width' => 62,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
      30 => array(
        'label' => 'Crop',
        'help' => 'Cropping will remove portions of an image to make it the specified dimensions.',
        'effect callback' => 'image_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_crop_form',
        'summary theme' => 'image_crop_summary',
        'module' => 'image',
        'name' => 'image_crop',
        'data' => array(
          'width' => 62,
          'height' => 62,
          'anchor' => 'center-center',
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: profile_main.
  $styles['profile_main'] = array(
    'name' => 'profile_main',
    'effects' => array(
      35 => array(
        'label' => 'Scale',
        'help' => 'Scaling will maintain the aspect-ratio of the original image. If only a single dimension is specified, the other dimension will be calculated.',
        'effect callback' => 'image_scale_effect',
        'dimensions callback' => 'image_scale_dimensions',
        'form callback' => 'image_scale_form',
        'summary theme' => 'image_scale_summary',
        'module' => 'image',
        'name' => 'image_scale',
        'data' => array(
          'width' => 170,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
      36 => array(
        'label' => 'Crop',
        'help' => 'Cropping will remove portions of an image to make it the specified dimensions.',
        'effect callback' => 'image_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_crop_form',
        'summary theme' => 'image_crop_summary',
        'module' => 'image',
        'name' => 'image_crop',
        'data' => array(
          'width' => 170,
          'height' => 170,
          'anchor' => 'center-center',
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: profile_sidebar.
  $styles['profile_sidebar'] = array(
    'name' => 'profile_sidebar',
    'effects' => array(
      37 => array(
        'label' => 'Scale',
        'help' => 'Scaling will maintain the aspect-ratio of the original image. If only a single dimension is specified, the other dimension will be calculated.',
        'effect callback' => 'image_scale_effect',
        'dimensions callback' => 'image_scale_dimensions',
        'form callback' => 'image_scale_form',
        'summary theme' => 'image_scale_summary',
        'module' => 'image',
        'name' => 'image_scale',
        'data' => array(
          'width' => 100,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
      38 => array(
        'label' => 'Crop',
        'help' => 'Cropping will remove portions of an image to make it the specified dimensions.',
        'effect callback' => 'image_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_crop_form',
        'summary theme' => 'image_crop_summary',
        'module' => 'image',
        'name' => 'image_crop',
        'data' => array(
          'width' => 100,
          'height' => 100,
          'anchor' => 'center-center',
        ),
        'weight' => 2,
      ),
    ),
  );

  return $styles;
}
