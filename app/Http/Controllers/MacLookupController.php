<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DeviceOui;

class MacLookupController extends Controller
{
    /**
     * Get vendor for single mac address
     * 
     * @method GET
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse 
     */
    public function getVendor(Request $request)
    {
        $request->validate([
            'mac_address' => 'required|string|min:12|max:17',
        ]);

        $mac_address = $request->input('mac_address');
        
        return DeviceOui::getVendor($mac_address);
    }

    /**
     * Get vendor for multiple mac addresses (comma delimited)
     * 
     * @method POST
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse 
     */
    public function getVendors(Request $request)
    {   
        $request->validate([
            'mac_address' => 'required|string',
        ]);

        $mac_address = $request->input('mac_address');
        
        return DeviceOui::getVendor($mac_address);
    }
}
