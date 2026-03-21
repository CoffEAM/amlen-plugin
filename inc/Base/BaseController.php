<?php 
/**
 * @package  AmlenPlugin
 */
namespace Inc\Base;

class BaseController
{
	public $plugin_path;

	public $plugin_url;

	public $plugin;

	public $managers = array();

	public function __construct() {
		$this->plugin_path = plugin_dir_path( dirname( __FILE__, 2 ) );
		$this->plugin_url = plugin_dir_url( dirname( __FILE__, 2 ) );
		$this->plugin = plugin_basename( dirname( __FILE__, 3 ) ) . '/amlen-plugin.php';

		$this->managers = array(
			'cpt_manager' => 'CPT Manager',
			'taxonomy_manager' => 'Taxonomy Manager',
			'media_manager' => 'Media Manager',
			'gallery_manager' => 'Gallery Manager',
			'testimonial_manager' => 'Testimonial Manager',
			'templates_manager' => 'Templates Manager',
			'login_manager' => 'Ajax Login/Signup',
			'membership_manager' => 'Membership Manager',
			'chat_manager' => 'Chat Manager',
		);
	}
}