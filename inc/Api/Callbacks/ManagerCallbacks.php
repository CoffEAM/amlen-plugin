<?php
/**
 * @package  AmlenPlugin
 */
namespace Inc\Api\Callbacks;

use Inc\Base\BaseController;

class ManagerCallbacks extends BaseController
{
	public function checkboxSanitize( $input )
	{
//		return filter_var($input, FILTER_SANITIZE_NUMBER_INT);
		return ( isset( $input ) ? true : false );
	}

	public function adminSectionManager()
	{
		echo 'Manage the Sections and Features of this plugin by activating the checkboxes';
	}

	public function checkboxField($args)
	{
		$name = $args['label_for'];
		$classes = $args['class'];
		$checkbox = get_option($name);

		echo '<div class="' . esc_attr($classes) . '">
        <input type="checkbox" id="' . esc_attr($name) . '" name="' . esc_attr($name) . '" value="1" ' . checked($checkbox, 1, false) . '>
        <label for="' . esc_attr($name) . '"><div></div></label>
    </div>';
	}
}
