<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceOui extends Model
{   
    protected $guarded = [];

    public static function getVendor($mac_address)
    {
        $dictionary = [];
        $lookup_mac_addresses = [];
        $result = [];
        $errors = [];
        $mac_addresses = explode(',', $mac_address);
        
        foreach($mac_addresses as $mac_a){

            $mac_a = strtoupper($mac_a);
            
            //strip out unwanted characters
            $mac_a_without_characters = preg_replace('/[^A-F0-9]/', '', $mac_a);
            
            $mac_address_is_valid = strlen($mac_a_without_characters) === 12;
            
            //handle not valid
            if(!$mac_address_is_valid){
                $errors[] = "Please check Mac address ($mac_a) and try again";
                continue;
            }

            //handle valid mac address
            $oui = substr($mac_address, 0, 6);
            
            // add to oui for lookup
            $lookup_mac_addresses[] = $oui;

            //keep track of mac address against oui
            $dictionary[$mac_a] = $oui;
        }

        //preform single lookup
        $vendors = self::whereIn('assignment', $lookup_mac_addresses)->get();

        //populate result & errors arr based on vendors found against dictionary of mac addresses -> oui
        foreach ($dictionary as $mac_address => $oui) {

            //find matching vendor based on assignment/oui
            $vendor = $vendors->firstWhere('assignment', $oui);
        
            if ($vendor) {
                //vendor found
                $result[] = [
                    'mac_address' => $mac_address,
                    'vendor' => $vendor['organization_name'],
                ];
            } else {
                $errors[] = "Vendor not found for MAC address ($mac_address)";
            }
        }

        return response()->json([
            'mac_addresses' => $result,
            'errors' => $errors,
        ], 200);
    }
}
