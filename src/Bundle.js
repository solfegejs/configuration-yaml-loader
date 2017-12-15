/* @flow */
import configYaml from "config-yaml"
import type Application from "solfegejs-application/src/Application"
import type {BundleInterface, InitializableBundleInterface} from "solfegejs-application/src/BundleInterface"
import type Configuration from "solfegejs-configuration/src/Configuration"

/**
 * YAML loader bundle
 */
export default class Bundle implements BundleInterface, InitializableBundleInterface
{
    /**
     * File path
     */
    filePath:string;

    /**
     * Constructor
     *
     * @param   {string}    filePath    File path
     */
    constructor(filePath:string):void
    {
        this.filePath = filePath;
    }

    /**
     * Get bundle path
     *
     * @return  {String}        The bundle path
     */
    getPath():string
    {
        return __dirname;
    }

    /**
     * Initialize the bundle
     *
     * @param   {Application}   application     Solfege application
     */
    initialize(application:Application)
    {
        let configuration:Configuration = application.getParameter("configuration");
        this.loadFile(configuration, this.filePath);
    }

    /**
     * Load file
     *
     * @param   {Configuration} configuration   Solfege configuration
     * @param   {string}        filePath        Configuration file path
     */
    loadFile(configuration:Configuration, filePath:string)
    {
        let properties = {};

        // Parse YAML file
        try {
            properties = configYaml(filePath, {encoding: "utf8"});
        } catch (error) {
            // Unable to parse YAML file
            console.error(error);
            return;
        }

        // Add properties to configuration
        configuration.addProperties(properties);
    }
}
