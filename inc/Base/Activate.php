<?php
/**
 * @package  AmlenPlugin
 */
namespace Inc\Base;

class Activate
{
	public static function activate() {
		flush_rewrite_rules();

		if ( get_option( 'amlen_plugin' ) ) {
			return;
		}

		$default = array();

		update_option( 'amlen_plugin', $default );
	}
}